import React from 'react';

function SideBar() {
  return (
    <div className='w-64 h-screen bg-gray-900 text-white'>
      <div className='p-4 text-lg font-bold'>ChatGPT</div>
      <div className='px-4 mt-8'>
        <div className='py-2 text-sm border-b border-gray-800'>Channel 1</div>
        <div className='py-2 text-sm border-b border-gray-800'>Channel 2</div>
        <div className='py-2 text-sm border-b border-gray-800'>Channel 3</div>
      </div>
    </div>
  );
}

export default SideBar;
