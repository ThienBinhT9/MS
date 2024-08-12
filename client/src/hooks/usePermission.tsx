import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const usePermission = (feature: string) => {
  const { client, currentUser } = useSelector((state: RootState) => state.user);

  const role = client?._id === currentUser?._id ? "author" : "client";

  const permisson = useMemo(() => {
    switch (role) {
      case "author": {
        return {
          AddBiography: ["VIEW", "EDIT", "DELETE"],
          CreateArticles: ["VIEW", "EDIT", "DELETE"],
          EditProfile: ["VIEW", "EDIT", "DELETE"],
          DetailedEditing: ["VIEW", "EDIT", "DELETE"],
          Think: ["VIEW", "EDIT", "DELETE"],
          EditCollapse: ["VIEW", "EDIT", "DELETE"],
        };
      }
      case "client": {
        return {
          AddBiography: [],
          CreateArticles: [],
          EditProfile: [],
          DetailedEditing: [],
          Think: [],
          EditCollapse: [],
        };
      }
      default:
        break;
    }
  }, [role]);

  const permissionFeature = permisson[feature];

  return {
    isView: !!permissionFeature.includes("VIEW"),
    isDelete: !!permissionFeature.includes("DELETE"),
    isEdit: !!permissionFeature.includes("EDIT"),
  };
};
