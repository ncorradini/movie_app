import "./ErrorView.scss";
import { PrimaryButton, Stack, Text } from "@fluentui/react";

type ErrorViewProps = {
  textAction: string;
  action: () => void;
};

const ErrorView = ({ textAction, action }: ErrorViewProps) => {
  return (
    <Stack as="div" className="error-view">
      <Text as="p">Ha ocurrido un error</Text>
      <PrimaryButton onClick={action}>{textAction}</PrimaryButton>
    </Stack>
  );
};

export default ErrorView;
