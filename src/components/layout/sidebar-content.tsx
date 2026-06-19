import { Menu } from '@primereact/ui/menu';
import { ABOUT_ROUTE, HOME_ROUTE, QUIZZES_ROUTE } from '@/utils/router-constants';
import Link from 'next/link';

export function SidebarContent() {
  return (
    <>
      <div className='ms-2 mt-2 mb-4 flex items-center justify-between lg:hidden'>
        <Link href={HOME_ROUTE}>
          <span className='text-primary text-2xl font-bold'>Quizly</span>
        </Link>
      </div>

      <Menu.Root className='w-full border-none! bg-transparent!'>
        <Menu.List className='p-0!'>
          <Menu.List>
            <Menu.Item>
              <Link href={QUIZZES_ROUTE} className='flex w-full items-center gap-2'>
                <i className='pi pi-list' />
                Quizzes List
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link href={ABOUT_ROUTE} className='flex w-full items-center gap-2'>
                <i className='pi pi-info-circle' />
                About
              </Link>
            </Menu.Item>
          </Menu.List>
        </Menu.List>
      </Menu.Root>
    </>
  );
}
