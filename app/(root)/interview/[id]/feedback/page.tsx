import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <section className="section-feedback">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Interview Feedback
        </h1>
        <p className="text-xl text-light-400">
          <span className="capitalize text-primary-200 font-semibold">
            {interview.role}
          </span>{" "}
          Interview Performance Analysis
        </p>
      </div>

      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-8 max-sm:flex-col max-sm:gap-4">
          {/* Overall Impression */}
          <div className="flex flex-row gap-3 items-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary-200/10 to-accent-100/10 border border-primary-200/20">
            <Image src="/star.svg" width={24} height={24} alt="star" />
            <p className="font-medium">
              Overall Score:{" "}
              <span className="text-primary-200 font-bold text-xl">
                {feedback?.totalScore}
              </span>
              <span className="text-light-400">/100</span>
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-3 items-center px-6 py-3 rounded-xl bg-dark-200/50 border border-dark-400/30">
            <Image src="/calendar.svg" width={24} height={24} alt="calendar" />
            <p className="font-medium text-light-200">
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-dark-400/30" />

      <div className="p-6 rounded-2xl bg-gradient-to-br from-dark-200/50 to-dark-300/50 border border-dark-400/30">
        <p className="text-lg leading-relaxed">{feedback?.finalAssessment}</p>
      </div>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Performance Breakdown
        </h2>
        <div className="grid gap-4">
          {feedback?.categoryScores?.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-dark-200/80 to-dark-300/80 border border-dark-400/30 hover:border-primary-200/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-200/20 text-primary-200 font-bold">
                  {index + 1}
                </div>
                <p className="font-bold text-xl">{category.name}</p>
                <div className="ml-auto px-4 py-1.5 rounded-full bg-primary-200/20 border border-primary-200/30">
                  <span className="text-primary-200 font-bold">
                    {category.score}
                  </span>
                  <span className="text-light-400">/100</span>
                </div>
              </div>
              <p className="text-light-200 leading-relaxed">
                {category.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-success-100/5 to-transparent border border-success-100/20">
        <h3 className="text-2xl font-bold tracking-tight text-success-100">
          ✓ Strengths
        </h3>
        <ul className="space-y-2">
          {feedback?.strengths?.map((strength, index) => (
            <li key={index} className="text-light-200 leading-relaxed">
              {strength}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-accent-100/5 to-transparent border border-accent-100/20">
        <h3 className="text-2xl font-bold tracking-tight text-accent-100">
          → Areas for Improvement
        </h3>
        <ul className="space-y-2">
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index} className="text-light-200 leading-relaxed">
              {area}
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            Back to Dashboard
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            Retake Interview
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;
