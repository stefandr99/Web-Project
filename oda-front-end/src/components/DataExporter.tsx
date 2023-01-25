import { Button } from "@mantine/core";

function downloadObjectAsJson(
  exportObj: Record<string, string>,
  exportName: string
) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj, null, 2));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function DataExporter({ data }: { data: Record<string, string> }) {
  return (
    <Button
      onClick={() => {
        downloadObjectAsJson(data, "data");
      }}
    >
      Export JSON
    </Button>
  );
}
