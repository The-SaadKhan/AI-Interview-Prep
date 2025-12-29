import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-8 max-w-2xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-primary-100 to-accent-100 bg-clip-text text-transparent">
              Master Every Interview with AI
            </h1>
            <p className="text-xl text-light-200 leading-relaxed">
              Practice with our advanced AI interviewer. Get instant, actionable feedback and perfect your responses before the real thing.
            </p>
          </div>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start Practice Session</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="AI Interview Coach"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-8 mt-12">
        <h2 className="text-3xl font-bold tracking-tight">Your Practice Sessions</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <div className="text-center py-12 px-6 rounded-2xl bg-dark-200/50 border border-dark-400/30">
              <p className="text-light-200 text-lg">Start your journey to interview mastery. Take your first practice session now!</p>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-8 mt-12">
        <h2 className="text-3xl font-bold tracking-tight">Available Practice Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
