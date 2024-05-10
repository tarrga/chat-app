import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
export default function Home() {
  return (
    <div className='flex w-full max-w-screen-xl justify-center flex-row mx-auto rounded-2xl overflow-hidden'>
      <Sidebar />
      <ChatArea />
    </div>
  );
}
