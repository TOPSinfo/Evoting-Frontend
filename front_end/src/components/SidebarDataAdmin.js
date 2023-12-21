import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Candidates',
    path: '/admin/candidatesList',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Add Candidate',
    path: '/admin/addCandidates',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Approve Voters',
    path: '/admin/approveVoter',
    icon: <FaIcons.FaAddressCard />,
    cName: 'nav-text'
  },
  {
    title: 'Change Voting Phase',
    path: '/admin/changePhase',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Results',
    path: '/admin/results',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  }
];