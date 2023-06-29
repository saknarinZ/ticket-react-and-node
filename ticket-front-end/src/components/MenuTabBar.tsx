import { MenuTabBarProps } from '../interface/menuTabBar.interface';

const MenuTabBar = ({ menu, setMenu }: MenuTabBarProps) => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          <div className="flex space-x-4">
            <button
              onClick={() => setMenu('update')}
              className={`text-green-600 hover:bg-green-700 ${
                menu === 'update' && 'bg-green-700 text-white'
              } hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              Create and update a ticket's status
            </button>
            <button
              onClick={() => setMenu('table')}
              className={`text-green-600 hover:bg-green-700 ${
                menu === 'table' && 'bg-green-700 text-white'
              } hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              table tickets
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MenuTabBar;
