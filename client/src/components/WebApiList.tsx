import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';
import { FaFolderPlus, FaEllipsisV, FaExternalLinkAlt } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';

import { EnrichedWebApi as WebApi } from '../../../server/src/util/webApi';
import { toReadableString, toDateString } from '../util/utils';
import { autoLink } from '../util/jsxHelpers';

const useWebApis = () => {
  const [webApis, setWebApis] = useState<WebApi[]>([]);

  useEffect(() => {
    ky.get('/api/webApi')
      .json()
      .then((resp) => {
        setWebApis(resp as WebApi[]);
      });
  }, []);

  return webApis;
};

const webApiDescription = (webApi: WebApi) => {
  const desc = toReadableString(webApi.annotation.description);
  return desc === '' ? <i>No description available</i> : autoLink(desc);
};

const webApiActionTooltip = (webApi: WebApi) => (
  <Tooltip id={`tooltip-actions-${webApi._id}`}>
    {webApi.actionStats.short.map(({ type, name }, i) => (
      <span key={i}>
        {`${toReadableString(name)} (${toReadableString(type)})`}
        <br />
      </span>
    ))}
  </Tooltip>
);

const confirmDelete = (webApi: WebApi) => {
  if (
    // eslint-disable-next-line no-alert
    window.confirm(
      `Are you sure you wish to delete the WebAPI entry for ${webApi.annotation.name}`,
    )
  ) {
    // TODO delete
  }
};

const optionsBlockBtn =
  'btn btn-light btn-block back-bor-white shadow-none text-left';

const webApiOptions = (webApi: WebApi) => (
  <Popover id={`popover-webapi-${webApi._id}`}>
    {/* <Popover.Title as="h3"></Popover.Title> */}
    <Popover.Content>
      <Link to={`/webAPI/${webApi._id}/view`} className={optionsBlockBtn}>
        View
      </Link>
      <Link to={`/webAPI/${webApi._id}/edit`} className={optionsBlockBtn}>
        Edit
      </Link>
      <button className={optionsBlockBtn} onClick={() => confirmDelete(webApi)}>
        Delete
      </button>
      <hr />
      <a
        className={optionsBlockBtn}
        href={`https://graphdb.sti2.at/resource?uri=${encodeURIComponent(
          `https://actions.semantify.it/graphs/${webApi.path}`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaExternalLinkAlt /> GraphDB Graph
      </a>
      <a
        className={optionsBlockBtn}
        href={`/api/webAPI/${webApi._id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaExternalLinkAlt /> WebAPI Annotation
      </a>
    </Popover.Content>
  </Popover>
);

const webApiCard = (webApi: WebApi) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title d-flex">
        <span>{toReadableString(webApi.annotation.name, '')}</span>
        <OverlayTrigger
          rootClose
          trigger="click"
          placement="bottom"
          overlay={webApiOptions(webApi)}
        >
          <button
            className="btn btn-light float-right back-bor-white shadow-none"
            style={{ transform: 'translate(20px, -20px)' }}
          >
            <FaEllipsisV />
          </button>
        </OverlayTrigger>
      </h5>

      <OverlayTrigger placement="bottom" overlay={webApiActionTooltip(webApi)}>
        <h6 className="card-subtitle mb-2 text-muted d-inline">
          {webApi.actionStats.count} Action
          {webApi.actionStats.count !== 1 && 's'}
        </h6>
      </OverlayTrigger>

      <p className="card-text">{webApiDescription(webApi)}</p>
      <p className="card-text">
        <small className="text-muted">
          {toDateString(webApi.updatedAt)}
          <span className="font-italic float-right">/{webApi.path}</span>
        </small>
      </p>
    </div>
  </div>
);

const webApiDeck = (webApis: WebApi[]) => (
  <div className="row">
    {webApis.map((webApi) => (
      <div key={webApi._id} className="col-lg-4 col-md-6 mb-4">
        {webApiCard(webApi)}
      </div>
    ))}
  </div>
);

const WebApiList = () => {
  const webApis = useWebApis();
  // TODO Loading

  return (
    <>
      <h2 className="mb-4">
        <span>Available Web APIs</span>
        <Link to="/webAPI/new" className="btn btn-success float-right">
          New <FaFolderPlus />
        </Link>
      </h2>
      {webApis.length === 0 ? (
        <i>No Web APIs available</i>
      ) : (
        webApiDeck(webApis.sort((a, b) => b._id.localeCompare(a._id)))
      )}
    </>
  );
};

export default WebApiList;
