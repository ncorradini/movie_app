import "./NotResultsView.scss";
import { Stack, Text } from "@fluentui/react";

const NotResultsView = () => {
  return (
    <Stack as="section" className="not-results-view">
      <Text as="h3">No se encontraron resultados</Text>
    </Stack>
  );
};

export default NotResultsView;
