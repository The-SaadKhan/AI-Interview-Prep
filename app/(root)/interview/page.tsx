import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex flex-col gap-3 mb-8">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
          Create Your Interview
        </h1>
        <p className="text-light-200 text-lg">
          Customize your practice session and start improving your interview
          skills
        </p>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate"
      />
    </>
  );
};

export default Page;
