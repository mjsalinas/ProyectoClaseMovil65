import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";

//D.R.Y = Dont Repeat Yourself 
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();