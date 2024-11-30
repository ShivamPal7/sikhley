"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
};

const CertificatePreview = ({ courseName }: { courseName: string | undefined }) => {
  const [publicId, setPublicId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Sending form data to your backend
      const response = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          courseName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate certificate");
      }

      const result = await response.json();
      setPublicId(result.publicId);  // Save publicId returned from the backend
      toast.success("Certificate Generated!");
    } catch (error) {
      toast.error("Error Generating Certificate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (publicId) {
      // Open the certificate URL using the publicId
      const url = `https://credsverse.com/credentials/${publicId}`;
      window.open(url, "_blank"); // Open the certificate in a new tab
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl">Generate Your Certificate</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <Input
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block">Email</label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {!publicId && (
          <div className="mt-6">
            <Button type="submit" disabled={isLoading}>
              Generate Certificate
            </Button>
          </div>
        )}
      </form>

      {publicId && (
        <div className="mt-6">
          <Button onClick={handleDownload}>
            Download Certificate
          </Button>
        </div>
      )}
    </div>
  );
};

export default CertificatePreview;
