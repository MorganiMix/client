import React from "react";
import { GrDriveCage } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrDownload } from "react-icons/gr";

const ServiceCard = ({ color, title, icon, subtitle, hyperlink }) => (
  <a href={hyperlink} target="_blank" rel="noopener noreferrer">
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
  </a>
);

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl">
          Nanifish: Self-hosted server that serves the community
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          More apps and features soon!
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Nanidrive"
          icon={<GrDriveCage fontSize={21} className="text-white" />}
          subtitle="Powered by Nextcloud, Nanidrive is a self-hosted cloud storage solution that runs on Unraid NAS."
          hyperlink="https://drive.nanifish.com"
        />
        
        <ServiceCard
          color="bg-[#1ADF75]"
          title="YouTube DL Server"
          icon={<GrDownload fontSize={21} className="text-white" />}
          subtitle="Enter a video url to download the video to the server. Url can be to YouTube or any other supported site."
          hyperlink="https://download.nanifish.com"
        />

        <ServiceCard
          color="bg-[#FFDA90]"
          title="File Downloader"
          icon={<GrDownload fontSize={21} className="text-white" />}
          subtitle="Download videos from the server. Please sign up if you do not have an account."
          hyperlink="https://filebrowser.nanifish.com"
        />

        <ServiceCard
          color="bg-[#AD6DEA]"
          title="Password Manager"
          icon={<RiLockPasswordFill fontSize={21} className="text-black" />}
          subtitle="
          Vaultwarden is a password manager server API implementation written in Rust compatible with upstream Bitwarden clients."
          hyperlink="https://warden.nanifish.com"
        />

      </div>
    </div>
  </div>
);

export default Services;
