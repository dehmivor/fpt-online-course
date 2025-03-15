import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  hideFooter,
  hideNavbar,
  showFooter,
  showNavbar,
} from "../../redux/layoutSlice";

export default function Notfound() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideNavbar());
    dispatch(hideFooter());

    return () => {
      dispatch(showNavbar());
      dispatch(showFooter());
    };
  }, [dispatch]);
  return (
    <div className="w-screen h-screen flex flex-col justify-center p-8 bg-light-gradient space-y-8">
      <h2 className="align-middle text-5xl md:text-9xl text-primary font-bold">
        {"Oooop :("}
      </h2>
      <h1 className="align-middle capitalize text-2xl md:text-5xl text-secondary font-medium">
        404 page not found{" "}
      </h1>
    </div>
  );
}
