// import Link from 'next/link';
// import { Button } from '@/components/ui/button';

// const SuccessPage = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="p-6 bg-white rounded-md shadow-md text-center">
//         <h1 className="text-2xl font-bold mb-4">Email Sent Successfully!</h1>
//         <p className="mb-6">Your message has been sent successfully. We will get back to you shortly.</p>
//         <div className="space-x-4">
//           <Link href="/">
//           <a className="px-4 py-2 bg-blue-500 text-white rounded-md">Go to Home</a>
//           </Link>
//           <Link href="/support">
//             <Button variant="secondary">Back to Support</Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Email Sent Successfully!</h1>
        <p className="mb-6 text-black dark:text-white">Your message has been sent successfully. We will get back to you shortly.</p>
        <div className="space-x-4">
          <Link href="/">
            <Button variant="primary">Go to Home</Button>
          </Link>
          <Link href="/support">
            <Button variant="secondaryAlt">Back to Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
