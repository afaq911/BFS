export const avatarNameHandler = (name) => {
  let checkLength = name?.split(" ")?.length;

  if (checkLength >= 2) {
    return (
      name?.split(" ")[0]?.split("")[0]?.toUpperCase() +
      "" +
      name?.split(" ")[1]?.split("")[0]?.toUpperCase()
    );
  } else {
    return (
      name?.split("")[0]?.toUpperCase() + "" + name?.split("")[1]?.toUpperCase()
    );
  }
};
