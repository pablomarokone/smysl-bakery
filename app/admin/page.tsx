import { TinaAdmin } from "tinacms/dist/admin";
import config from "../../tina.config";

export default function AdminPage() {
  return <TinaAdmin config={config} />;
}