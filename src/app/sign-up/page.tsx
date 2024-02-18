"use client";

import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInFormState, signInAction } from "@/features/auth/signIn/actions/signInAction";
import { PasswordInput } from "@/components/form/PasswordInput";
import { Icons } from "@/components/icnos";

export default function SignIn () {
  const initialFormState: SignInFormState = {};

  const [formState, dispatch] = useFormState(signInAction, initialFormState);

  return (
    <div className="min-h-screen">
      <main className="flex flex-col items-center justify-center gap-5 pt-16 px-5 pb-8">
        <div className="w-96 flex flex-col gap-5">
          <div>
            <h1 className="mt-8 mb-2 text-2xl lg:text-3xl">Get started</h1>
            <h2 className="text-sm text-muted-foreground">Create a new account</h2>
          </div>
          <form action={dispatch}>
            <div className="flex flex-col gap-5">
              <div>
                <Label className="font-normal">Email</Label>
                <Input name="email" className="focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0" />
              </div>

              <div>
                <Label className="font-normal">Password</Label>
                <PasswordInput inputProps={{ name: "password" }} iconProps={{ size: 20 }} />
              </div>
              <Button type="submit" className="bg-emerald-600 border border-emerald-500 hover:bg-emerald-700">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};