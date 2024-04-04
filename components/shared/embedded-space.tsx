import { ISpace, useSpace } from "@flatfile/react";

type Props = {
  spaceProps: ISpace;
};

const EmbeddedSpace = ({ spaceProps }: Props) => {
  const space = useSpace({ ...spaceProps });

  return space;
};

export default EmbeddedSpace;
