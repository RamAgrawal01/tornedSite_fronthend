
import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import ConfirmationModal from "../../common/confirmationModal"
import useOnClickOutside from "use-onclickoutside"
import { logout } from "../../../services/operations/authAPI"



export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const [confirmationModal  , setConfirmationModal] = useState(null);
  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null
  // console.log('user data from store = ', user )



  return (

    // only for large devices

    <button className="relative hidden sm:flex" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className={'aspect-square w-[30px] rounded-full object-cover'}
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-navyblue-700  overflow-hidden rounded-md border-[1px] border-navyblue-600 bg-navyblue-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-navyblue-100 hover:bg-navyblue-700 hover:text-navyblue-50">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={()=>setConfirmationModal({
              text1:"Are You Sure ?",
              text2:"You will be logged out of your Account",
              buttonText:"Logout",
              button2Text:"Cancel",
              buttonHandler: () => dispatch(logout(navigate)),
              button2Handler:() => setConfirmationModal(null),
         })}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-navyblue-100 hover:bg-navyblue-700 hover:text-navyblue-50"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>

          <div> 
            {
              confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }              
                
          </div>
        </div>
      )}
    </button>
  )
}
