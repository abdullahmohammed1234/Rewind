import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type (allow images and videos)
    const allowedTypes = ['image/', 'video/'];
    const isAllowed = allowedTypes.some(type => file.type.startsWith(type));
    if (!isAllowed) {
      return NextResponse.json({ error: 'Only image and video files are allowed' }, { status: 400 });
    }

    // Validate file size (max 50MB for videos, 5MB for images)
    const isVideo = file.type.startsWith('video/');
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: isVideo ? 'Video too large (max 50MB)' : 'File too large (max 5MB)' 
      }, { status: 400 });
    }

    // Generate unique filename with token
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const token = `${timestamp}-${randomSuffix}-${sanitizedName}`;
    
    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = join(uploadsDir, token);
    await writeFile(filepath, buffer);

    // Return the public URL path and token
    return NextResponse.json({
      success: true,
      url: `/uploads/${token}`,
      token: token,
      originalName: file.name,
      size: file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
