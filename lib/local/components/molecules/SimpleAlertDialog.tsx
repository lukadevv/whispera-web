import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";

type SimpleAlertDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  cancel: string;
  confirm: {
    label: string;
    handleClick: () => void;
  } & Pick<Parameters<typeof AlertDialogAction>[0], "variant">;
};

export default function SimpleAlertDialog({
  trigger,
  cancel,
  confirm,
  description,
  title,
}: SimpleAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <AlertDialogAction
            variant={confirm.variant}
            onClick={() => confirm.handleClick()}
          >
            {confirm.label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
