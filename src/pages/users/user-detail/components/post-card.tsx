/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface PostCardProps {
  post: any;
  onDelete: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  return (
    <div className="border border-[#E2E8F0] rounded-lg p-4 h-[293px] w-[270px]">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          className="text-destructive hover:text-destructive p-0 w-6 h-6 m-[-0.5rem] cursor-pointer"
          onClick={() => onDelete(post.id)}
        >
          <Trash2 />
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className='text-[18px]'>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    </div>
  );
}