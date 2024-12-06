import { Banner } from '@/components/banner';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import { getCertificate } from "@/actions/get-certificate";
import CertificateForm from './components/CertificatePreview';
import { Lock } from 'lucide-react';

const CertificatePage = async ({ params }: { params: { courseId: string } }) => {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const { course, purchase, isCompleted } = await getCertificate({
        userId,
        courseId: params.courseId,
    });

    const isLocked = !purchase;

    return (
        <div>
            {isLocked && (
                <Banner
                    variant="warning"
                    label="You need to purchase this course to get a certificate."
                />
            )}

            {!isLocked && !isCompleted && (
                <Banner
                    variant="warning"
                    label="You need to complete this course to get a certificate."
                />
            )}

            {isLocked && (
                <div className="flex flex-col max-w-4xl mx-auto pb-20">
                    <div className="p-4">
                        <div className='relative aspect-video'>
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                                <Lock className="h-8 w-8" />
                                <p className="text-sm">Certificate is locked</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isLocked && !isCompleted && (
                <div className="flex flex-col max-w-4xl mx-auto pb-20">
                    <div className="p-4">
                        <div className='relative aspect-video'>
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                                <Lock className="h-8 w-8" />
                                <p className="text-sm">Certificate is locked</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isLocked && isCompleted && (
                <div className="flex flex-col max-w-4xl mx-auto pb-20">
                    <div className="p-4">
                        <CertificateForm courseName={course?.title} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificatePage;
