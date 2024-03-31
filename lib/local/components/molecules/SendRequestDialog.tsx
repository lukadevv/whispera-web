"use client";

import { UserPlus } from "lucide-react";
import { Button } from "../atoms/Button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../atoms/InputOTP";
import { AlertDialogHeader } from "./AlertDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import useChat from "../../hooks/useChat";
import { FormEventHandler, useCallback, useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useToast } from "../../hooks/useToast";
import LoadingSpinner from "../atoms/LoadingSpinner";

type SendRequestDialogProps = React.PropsWithChildren;

export default function SendRequestDialog({
  children,
}: SendRequestDialogProps) {
  const [open, setRawOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const setOpen: React.Dispatch<React.SetStateAction<boolean>> = useCallback(
    (value) => {
      setRawOpen(value);
      setCode("");
    },
    []
  );
  const {
    actions: { sendRequest },
  } = useChat();

  const { toast } = useToast();

  const handleSubmit = useCallback<
    NonNullable<FormEventHandler<HTMLFormElement>>
  >(
    (event) => {
      event?.preventDefault();

      if (code?.length !== 8) {
        return;
      }

      setLoading(true);
      sendRequest(code)
        .then((success) => {
          return success
            ? toast({
                title: `Request`,
                description: `Request to "#${code}" was sent successfully!`,
              })
            : toast({
                title: `Request`,
                description: `Contact "#${code}" does not exists!`,
                variant: "destructive",
              });
        })
        .finally(() => {
          setOpen(false);
          setLoading(false);
        });
    },
    [code, sendRequest, setOpen, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <DialogTitle>Send friend request</DialogTitle>
            <DialogDescription>
              Add the contact code of the user you want to add
            </DialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="items-center gap-4 mt-2">
              <InputOTP
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                maxLength={8}
                onChange={(value) => setCode(value)}
                spellCheck={false}
                disabled={loading}
              >
                <InputOTPGroup className="m-auto">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button
              type="submit"
              disabled={loading || code?.length !== 8}
              className="w-full"
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="mr-1">
                    <UserPlus width={"17px"} />
                  </span>
                  Send
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
