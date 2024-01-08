import { Icons } from '@/components/icnos';

export const TimeSelect = () => {
  const hourValues = Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minValues = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // TODO:  button on click and delete element

  return (
    <div className='flex items-center gap-2'>
      <div className='p-2 bg-white rounded-md border'>
        <div className='flex'>
          <select name='hours' className='bg-transparent text-sm appearance-none outline-none hover:cursor-pointer'>
            {hourValues.map(hour =>
              <option key={hour} value={hour}>{hour}</option>
            )}
          </select>
          <span className='text-sm'>:</span>
          <select name='minutes' className='bg-transparent text-sm appearance-none outline-none mr-2 hover:cursor-pointer'>
            {minValues.map(min =>
              <option key={min} value={parseInt(min, 10)}>{min}</option>
            )}
          </select>
          <select name='ampm' className='bg-transparent text-sm appearance-none outline-none hover:cursor-pointer'>
            <option value='am'>am</option>
            <option value='pm'>pm</option>
          </select>
        </div>
      </div>
      {/* <button>
        <Icons.x className='w-4' />
      </button> */}
    </div>

  );
};
