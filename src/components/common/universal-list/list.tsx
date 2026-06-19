'use client';

import { DataView } from '@primereact/ui/dataview';
import React from 'react';
import { ListSkeleton } from './list-skeletons';
import { ListNotFound } from './list-not-found';

export function UniversalList<T>({
  children,
  items = [],
  itemTemplate,
  isLoading = false,
  emptyMessage = 'Item not found',
  className = '',
}: {
  children?: React.ReactNode;
  items: T[];
  itemTemplate: (item: T, index: number) => React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}) {
  let content;

  if (isLoading) {
    content = (
      <div className='space-y-4'>
        {Array.from({ length: 2 }).map((_, index) => (
          <ListSkeleton key={index} />
        ))}
      </div>
    );
  } else if (items.length === 0) {
    content = <ListNotFound emptyMessage={emptyMessage} />;
  } else {
    content = (
      <DataView>
        <div className='flex flex-col'>
          {items.map((item, index) => (
            <React.Fragment key={index}>{itemTemplate(item, index)}</React.Fragment>
          ))}
        </div>
      </DataView>
    );
  }

  return (
    <div className={className}>
      {children}
      {content}
    </div>
  );
}
