'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Category, Item } from '@/types';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  category: Category;
  items: Item[];
}

export function CategorySection({ category, items }: CategorySectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-3xl">{category.icon}</span>
        <h2 className="text-2xl font-bold text-retro-dark">
          {category.name}
        </h2>
        <div className="flex-1 h-px bg-retro-teal/20" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <Link key={item.id} href={`/trend/${item.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full hover:border-retro-teal/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-retro-dark mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-retro-gray line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    {item.popularityScore && (
                      <div className={cn(
                        'px-2 py-1 rounded text-xs font-bold',
                        item.popularityScore >= 90 
                          ? 'bg-retro-teal/20 text-retro-teal' 
                          : 'bg-retro-purple/20 text-retro-purple'
                      )}>
                        {item.popularityScore}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
