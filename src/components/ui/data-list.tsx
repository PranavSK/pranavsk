import type { ComponentPropsWithRef, FC } from 'react';
import { cx } from '@/lib/utils';

interface DataListProps extends ComponentPropsWithRef<'dl'> {}
export const DataList: FC<DataListProps> = ({ className, ...props }) => {
  return <dl className={cx('group mb-12 grid grid-cols-3 gap-8 gap-y-2 sm:(mb-16 gap-y-4)', className)} {...props} />;
};

interface DataListHeaderProps extends ComponentPropsWithRef<'dt'> {}
export const DataListHeader: FC<DataListHeaderProps> = ({ className, ...props }) => {
  return <dt className={cx('col-span-3 sm:col-span-1 group-not-first:first:(border-t pt-4) ', className)} {...props} />;
};

interface DataListContentProps extends ComponentPropsWithRef<'dd'> {}
export const DataListContent: FC<DataListContentProps> = ({ className, ...props }) => {
  return (
    <dd
      className={cx('col-span-3 sm:col-span-2 sm:group-not-first:[&:nth-child(2)]:(border-t pt-4)', className)}
      {...props}
    />
  );
};
