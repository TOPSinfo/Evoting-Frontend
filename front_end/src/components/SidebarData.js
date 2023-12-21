import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/user',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'User Details',
    path: '/user/userdetails',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Registration',
    path: '/user/registration',
    icon: <FaIcons.FaAddressCard />,
    cName: 'nav-text'
  },
  {
    title: 'Voting',
    path: '/user/voting',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Results',
    path: '/user/results',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  }
];