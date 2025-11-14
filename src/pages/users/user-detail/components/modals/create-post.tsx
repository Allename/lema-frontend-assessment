import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(160, "Message must not be longer than 30 characters."),
}).strict();

type CreatePostForm = z.infer<typeof createPostSchema>;

const CreatePost = ({ open, onOpenChange }: ModalProps) => {
  const queryClient = useQueryClient();

  const form = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema),
  });

  // Submit
  const onSubmit = (data: CreatePostForm) => {
    console.log(data);
    queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    // handleCreateAnnouncement.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-primary max-h-[70vh] max-w-[50vw] flex flex-col [&>button]:hidden">
        <DialogHeader className="sticky top-0 bg-background z-10">
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span className="text-primary text-4xl">New Post</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 overflow-y-auto flex-1"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col my-4">
                  <FormLabel className="text-black">Post title</FormLabel>
                  <FormControl>
                    <Input
                      // rows={4}
                      {...field}
                      placeholder="Give your post a title"
                      className="h-12 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col my-4">
                  <FormLabel className="text-black">Post body</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      {...field}
                      placeholder="Write something mind-blowing"
                      className="h-18 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-end">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset({});
                    onOpenChange(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="px-[2rem] bg-[#155DFC] hover:bg-[#155DFC]">
                  {/* {handleCreateAnnouncement.isPending ? (
                    <Oval
                      visible={true}
                      strokeWidth={4}
                      height="20"
                      width="20"
                      color="#174078"
                      secondaryColor="#F4F4F4"
                      ariaLabel="oval-loading"
                    />
                  ) : (
                    "Create"
                  )} */}
                  Publish
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
