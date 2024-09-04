'use client';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const User = () => {
  return (
    <div className="p-global">
      <div className="flex flex-col items-center gap-3 mb-7 mt-3">
        <Image src={'/images/profile_img.jpg'} width={90} height={90} className="rounded-[50%] h-[90px]" alt="Profile Img" />
        <span className="fsr-18 font-isb">Esther Howard</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center py-1">
          <div className="flex items-center gap-2 mr-auto">
            <PersonIcon />
            <span className="fsr-16 inter">Profile</span>
          </div>
          <ArrowForwardIosIcon sx={{ width: '18px' }} />
        </div>

        <div className="flex items-center py-1">
          <div className="flex items-center gap-2 mr-auto">
            <EmojiEventsOutlinedIcon />
            <span className="fsr-16 inter">My Membership</span>
          </div>
          <ArrowForwardIosIcon sx={{ width: '18px' }} />
        </div>

        <div className="flex items-center py-1">
          <div className="flex items-center gap-2 mr-auto">
            <FitnessCenterIcon />
            <span className="fsr-16 inter">My Workout</span>
          </div>
          <ArrowForwardIosIcon sx={{ width: '18px' }} />
        </div>

        <div className="flex items-center py-1">
          <div className="flex items-center gap-2 mr-auto">
            <InfoOutlinedIcon />
            <span className="fsr-16 inter">Help Center</span>
          </div>
          <ArrowForwardIosIcon sx={{ width: '18px' }} />
        </div>

        <div className="flex items-center py-1">
          <div className="flex items-center gap-2 mr-auto">
            <PolicyOutlinedIcon />
            <span className="fsr-16 inter">Privacy Policy</span>
          </div>
          <ArrowForwardIosIcon sx={{ width: '18px' }} />
        </div>

        <div className="flex items-center py-1">
          <div className="flex items-center gap-2 mr-auto">
            <ExitToAppOutlinedIcon />
            <span className="fsr-16 inter">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
