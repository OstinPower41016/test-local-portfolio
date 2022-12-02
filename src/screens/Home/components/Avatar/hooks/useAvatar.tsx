import { useState } from "react";

import plugAvatar from "../assets/plugAvatar.jpg";

type THook = () => {
  state: {
    image: string;
  };
  handlers: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

const useAvatar: THook = () => {
  const [image, setImage] = useState(window.localStorage.getItem("avatar_image") ?? plugAvatar);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener("load", (e) => {
      const res = e.target?.result;
      if (res) {
        localStorage.setItem("avatar_image", res.toString());
        setImage(res.toString());
      }
    });
  };

  return {
    state: {
      image,
    },
    handlers: {
      onChange,
    },
  };
};

export default useAvatar;
