import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { initOrganizations } from '@/store/main/slicer';
import { getData, mainLoading } from '@/store/main/selectors';

const Organizations: React.FC = () => {
  const dispatch = useDispatch();
  const { organizations } = useSelector(getData, shallowEqual);
  const loading = useSelector(mainLoading, shallowEqual);

  useEffect(() => {
    dispatch(initOrganizations());
  }, []);

  return (
    <div className="organizationsPage container">
      {!!loading ?
        <CircularProgress color="primary"
          sx={{ position: 'absolute', top: '48%', left: '50%', color: '#82B284'}}
        />
        : <ul className="organizationsList">
          {(organizations || []).map((organization) =><li key={organization.id} className="organizationsList__item">
            <Link to={`/market/organizations/${organization.id}`} className="organizationsList__link">{organization.shortName}</Link>
          </li>)}
        </ul>
      }
    </div>
  );
}

export default Organizations
