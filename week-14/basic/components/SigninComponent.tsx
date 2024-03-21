"use client";

import LabelledInput from "@/components/LabelledInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SigninComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Sign up</div>
            </div>
            <div className="pt-2">
              <LabelledInput
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                label="username"
                placeholder="unique name"
              />
              <LabelledInput
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                label="eamil"
                placeholder="example@gmail.com"
              />
              <LabelledInput
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="Password"
                type={"password"}
                placeholder="123456"
              />
              <button
                type="button"
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={async (e) => {
                  const { data, status } = await axios.post(
                    "http://localhost:3000/api/user",
                    {
                      username,
                      password,
                      email,
                    }
                  );
                  if (status === 200) {
                    router.push("/dashboard");
                    console.log(data.user.id);
                  }
                }}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
