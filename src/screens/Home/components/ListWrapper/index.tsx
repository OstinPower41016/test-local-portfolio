import { FC } from "react";

import HeaderBlock from "@shared/components/HeaderBlock";

interface IListWrapper {
  title: string;
  children: React.ReactNode;
}

const ListWrapper: FC<IListWrapper> = (props) => {
  return (
    <div className="flex flex-col">
      <>
        <HeaderBlock children={props.title} />
        <div className="mt-4">{props.children}</div>
      </>
    </div>
  );
};

export default ListWrapper;
