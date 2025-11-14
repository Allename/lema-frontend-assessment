import { useModal } from '@/hooks/use-modal';
import { Route } from '@/routes/users/$userId'
import { CirclePlus } from 'lucide-react';
import CreatePost from './components/modals/create-post';
import { PostCard } from './components/post-card';
import { useState } from 'react';

const posts = [
  {
    id: '1',
    title: 'Child of Prophecy',
    body: 'A story about a young man who is born with a special ability to see the future.'
  },
  {
    id: '1',
    title: 'Child of Prophecy',
    body: 'A story about a young man who is born with a special ability to see the future.'
  },
  {
    id: '2',
    title: 'Child of Prophecy',
    body: 'A story about a young man who is born with a special ability to see the future.'
  },
  {
    id: '3',
    title: 'Child of Prophecy',
    body: 'A story about a young man who is born with a special ability to see the future.'
  },
  {
    id: '4',
    title: 'Child of Prophecy',
    body: 'A story about a young man who is born with a special ability to see the future.'
  },
  {
    id: '5',
    title: 'Child of Prophecy',
    body: 'A story about a young man who is born with a special ability to see the future.'
  },
  {
    id: '6',
    title: 'Child of Prophecy',
    body: 'A story about a young man who is born with a special ability to see the future.'
  },
]

const UserDetail = () => {
  const { userId } = Route.useParams();
  const [loading, setLoading] = useState<boolean>(false);

  console.log(userId);
  const { modals, toggle } = useModal({
    createPost: false,
    deletePost: false,
  });

  const handleDeletePost = () => {
    console.log('Delete');
    setLoading(true);
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-8">
      <div className='flex flex-col gap-8'>
        <div>
          <p></p>
          <h1 className='text-4xl'>Allename Anthony</h1>
          <div>
            <span>allename.dev@gmail.com</span>
            <span>. 4posts</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            className="border border-dashed cursor-pointer rounded-lg p-4 h-[293px] w-[270px] flex items-center justify-center"
            onClick={() => toggle("createPost", true)}
          >
            <div className="flex flex-col items-center justify-center">
              <CirclePlus />
              <p>New Post</p>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      <CreatePost
        open={modals.createPost}
        onOpenChange={(open) => toggle("createPost", open)}
      />
    </div>
  );
}

export default UserDetail