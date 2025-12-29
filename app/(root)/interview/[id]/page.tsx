import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
      <div className="flex flex-row gap-6 justify-between items-center max-sm:flex-col max-sm:items-start">
        <div className="flex flex-row gap-6 items-center max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <div className="flex flex-row gap-4 items-center">
            <div className="p-1 rounded-full bg-gradient-to-br from-primary-200/60 via-accent-100/40 to-primary-300/60">
              <Image
                src={getRandomInterviewCover()}
                alt="cover-image"
                width={50}
                height={50}
                className="rounded-full object-cover size-[50px]"
              />
            </div>
            <h3 className="capitalize text-2xl font-bold">
              {interview.role} Interview
            </h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <div className="bg-gradient-to-r from-primary-200/20 to-primary-300/20 px-6 py-2.5 rounded-xl border border-primary-200/30 backdrop-blur-sm">
          <p className="font-semibold text-primary-100">{interview.type}</p>
        </div>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default InterviewDetails;
