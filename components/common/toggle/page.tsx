"use client"
import { Routes } from "@/routes";
import { saveUserRole } from "@/store/reducers/userReducer";
import { RootState } from "@/store/store";
import { Role_Enums } from "@/utils/enum/page";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toggle from "react-toggle";
import "react-toggle/style.css";

export default function CustomToggle() {
  const [isToggled, setIsToggled] = useState(false);
  const dispatch = useDispatch()
  const pathname = usePathname()
  const { push } = useRouter()
  // Fetch Recipient Id
  const { user } = useSelector((state: RootState) => state.user)

  const handleToggle = (value: boolean) => {
    if (pathname === Routes.GATEHOUSE) {
      push(Routes.SUBSCRIBER)
      setIsToggled(true)
      dispatch(saveUserRole(Role_Enums.SUBSCRIBER))
    } else {
      push(Routes.GATEHOUSE)
      setIsToggled(false)
      dispatch(saveUserRole(Role_Enums.GATEHOUSE))
    }
  }

  return (
    <div className="flex items-center mt-2">
      <label className="bg-primary">
        {/* <span>Switch to Subscriber </span> */}
        <Toggle
          className="bg-primary"
          disabled={user?.role === Role_Enums.GATEHOUSE ? true : false}
          checked={pathname === Routes.SUBSCRIBER ? true : isToggled}
          onChange={(e: any) => handleToggle(e.target.checked)}
          // icons={{ checked: "🌞", unchecked: "🌜" }}
          icons={false}
        />
      </label>
      {/* <p>{isToggled ? "Switch is ON" : "Switch is OFF"}</p> */}
    </div>
  );
}
