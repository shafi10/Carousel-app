import { Toast, Frame } from "@shopify/polaris";
import { useUI } from "../../contexts/ui.context";

export function ToastContainer() {
  const { toast, setToggleToast } = useUI();

  return (
    <div style={{ height: "250px" }}>
      <Frame>
        {toast?.active ? (
          <Toast
            content={toast?.message}
            onDismiss={() => setToggleToast({ active: false, message: "" })}
          />
        ) : null}
      </Frame>
    </div>
  );
}
