import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { updateOrganizations, updateContact, initContact, delOrganization, delImage } from '@/store/main/slicer';
import { getData, mainLoading } from '@/store/main/selectors';
import { Contact, Organization, OrganizationInfo, Photo } from '@/entities/interfaces';

const typesArr = [
  ['agent', 'Агент'],
  ['contractor', 'Подрядчик']
]

const Card: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [openDel, setOpenDel] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [businessEntity, setBusinessEntity] = useState('');
  const [contractNo, setContractNo] = useState('');
  const [contractDate, setContractDate] = useState('');
  const [typeAgent, setTypeAgent] = useState(false);
  const [typeContractor, setTypeContractor] = useState(false);
  const [userLastname, setUserLastname] = useState('');
  const [userFirstname, setUserFirstname] = useState('');
  const [userPatronymic, setUserPatronymic] = useState('');
  const [userTel, setUserTel] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { organizations, contacts } = useSelector(getData, shallowEqual);
  const loading = useSelector(mainLoading, shallowEqual);

  const currentOrganization = useMemo(() => (organizations || []).filter(({ id }) => id === params.id ), [organizations]);
  const organization:Organization = currentOrganization[0];
  const contact:Contact = contacts[0];

  useEffect(() => {
    if(organization && organization.contactId) dispatch(initContact(organization.contactId));
    else navigate(-1);
  }, []);

  const getFormatDate = (date:Date) => {
    const newDate = new Date(date);
    const d = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate);
    const m = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(newDate);
    const y = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate);
    return `${d}.${m}.${y}`;
  }

  const getType = (type:[]):string => {
    let typeStr = '';
    type.forEach((str, idx) => {
      if(str === typesArr[idx][0]) typeStr = typeStr + typesArr[idx][1] + ', ';
    });
    return typeStr.slice(0, -2);
  }

  const handleDelToggle = () => {
   if(!openDel) setOpenDel(true);
   else setOpenDel(false);
  }

  const handleNameOpen = () => {
    setOpenName(true);
  }

  const handleNameClose = () => {
    setOpenName(false);
    setShortName('');
  }

  const changeShortName = (e:ChangeEvent) => {
    setShortName(e.target.value);
  }

  const handleInfoOpen = () => {
    setOpenInfo(true);
  }

  const handleInfoClose = () => {
    setOpenInfo(false);
    setName('');
    setBusinessEntity('');
    setContractNo('');
    setContractDate('');
    setTypeAgent(false);
    setTypeContractor(false);
  }

  const changeName = (e:ChangeEvent) => {
    setName(e.target.value);
  }

  const changeBusinessEntity = (e:ChangeEvent) => {
    setBusinessEntity(e.target.value);
  }

  const changeContractNo = (e:ChangeEvent) => {
    setContractNo(e.target.value);
  }

  const changeContractDate = (e:ChangeEvent) => {
    setContractDate(e.target.value);
  }

  const changeTypeAgent = (e:ChangeEvent) => {
    setTypeAgent(!typeAgent);
  }

  const changeTypeContractor = (e:ChangeEvent) => {
    setTypeContractor(!typeContractor);
  }

  const handleContactOpen = () => {
    setOpenContact(true);
  }

  const handleContactClose = () => {
    setOpenContact(false);
    setUserLastname('');
    setUserFirstname('');
    setUserPatronymic('');
    setUserTel('');
    setUserEmail('');
  }

  const changeContactName = (e:ChangeEvent) => {
    setUserFirstname(e.target.value);
  }

  const changeContactLastname = (e:ChangeEvent) => {
    setUserLastname(e.target.value);
  }

  const changeContactPatronymic = (e:ChangeEvent) => {
    setUserPatronymic(e.target.value);
  }

  const changeContactTel = (e:ChangeEvent) => {
    setUserTel(e.target.value);
  }

  const changeContactEmail = (e:ChangeEvent) => {
    setUserEmail(e.target.value);
  }

  const handleLinked = () => {
    console.log(window.location.href);
  }

  const handleDelCard = () => {
    dispatch(delOrganization());
    handleDelToggle();
  }

  const handleEditInfo = (e:FormEvent) => {
    e.preventDefault();
    const obj:OrganizationInfo = {};
    const type = [];
    if(!!shortName) obj.shortName = shortName;
    if(!!name) obj.name = name;
    if(!!businessEntity) obj.businessEntity = businessEntity;
    if(!!contractNo && !!contractDate) obj.contract = { no: contractNo, issue_date: contractDate }
    if(!!typeAgent) type.push('agent');
    if(!!typeContractor) type.push('contractor');
    if(!!type.length) obj.type = type;

    if(Object.keys(obj).length) {
      dispatch(updateOrganizations(obj));
      handleNameClose();
      handleInfoClose();
    }
  }

  const handleEditContact = (e:FormEvent) => {
    e.preventDefault();
    const obj:Contact = {};
    if(!!userLastname) obj.lastname = userLastname;
    if(!!userFirstname) obj.firstname = userFirstname;
    if(!!userPatronymic) obj.patronymic = userPatronymic;
    if(!!userTel) obj.phone = userTel;
    if(!!userEmail) obj.email = userEmail;

    if(Object.keys(obj).length) {
      dispatch(updateContact(contact.id, obj));
      handleContactClose();
    }
  }

  const handleDelImg = (name:string) => () => {
    dispatch(delImage(name));
  }

  return (
    <div className="cardPage container">
      {!!loading &&
        <CircularProgress color="primary"
          sx={{ position: 'absolute', top: '48%', left: '50%', color: '#82B284'}}
        />
      }
      <Dialog open={openDel} onClose={handleDelToggle} className="dialog">
        <DialogTitle className="dialog__heading">Удалить карточку</DialogTitle>
        <DialogContent className="dialog__content">
          <p className="dialog__delCard">Отправить карточку организации в архив?</p>
        </DialogContent>
        <DialogActions className="dialog__actions">
          <Button className="dialog__btn" variant="text" onClick={handleDelToggle}>ОТМЕНА</Button>
          <Button className="dialog__btn" variant="text" onClick={handleDelCard}>УДАЛИТЬ</Button>
        </DialogActions>
      </Dialog>

      {(!!organization && !!contact) &&
        <div className="card">
          <div className="cardTop">
            <div onClick={() => navigate(-1)} className="cardTop__back"><img src="/images/icons/Long.svg" alt="icon" className="cardTop__icon" />К СПИСКУ ЮРИДИЧЕСКИХ ЛИЦ</div>
            <div className="cardTop__btns">
              <img onClick={handleLinked} src="/images/icons/Linked.svg" alt="link" className="cardTop__imgBtn" />
              <img onClick={() => navigate(0)} src="/images/icons/Rotation.svg" alt="update" className="cardTop__imgBtn" />
              <img onClick={handleDelToggle} src="/images/icons/Delete.svg" alt="delete" className="cardTop__imgBtn" />
            </div>
          </div>
          <hr className="divider dividerTop" />
          <h3 className="card__heading">{organization.shortName}<img onClick={handleNameOpen} src="/images/icons/Edit.svg" alt="edit" className="card__imgBtn" /></h3>
          <div className="organizationInfo">
            <h4 className="organizationInfo__heading">ОБЩАЯ ИНФОРМАЦИЯ<img onClick={handleInfoOpen} src="/images/icons/Edit.svg" alt="edit" className="card__imgBtn" /></h4>
            <p className="organizationInfo__text"><span className="organizationInfo__span">Полное название:</span>{organization.name}</p>
            <p className="organizationInfo__text"><span className="organizationInfo__span">Договор:</span>{`${organization.contract.no} от ${getFormatDate(organization.contract.issue_date)}`}</p>
            <p className="organizationInfo__text"><span className="organizationInfo__span">Форма:</span>{organization.businessEntity}</p>
            <p className="organizationInfo__text"><span className="organizationInfo__span">Тип:</span>{getType(organization.type)}</p>
          </div>
          <hr className="divider" />
          <div className="contactInfo">
            <h4 className="contactInfo__heading">КОНТАКТНЫЕ ДАННЫЕ<img onClick={handleContactOpen} src="/images/icons/Edit.svg" alt="edit" className="card__imgBtn" /></h4>
            <p className="contactInfo__text"><span className="contactInfo__span">ФИО:</span>{`${contact.lastname} ${contact.firstname} ${contact.patronymic}`}</p>
            <p className="contactInfo__text"><span className="contactInfo__span">Телефон:</span><a href={`tel:${contact.phone}`} className="contactInfo__tel">{contact.phone}</a></p>
            <p className="contactInfo__text"><span className="contactInfo__span">Эл. почта:</span><a href={`mailto:${contact.email}`} className="contactInfo__email">{contact.email}</a></p>
          </div>
          <hr className="divider" />
          <div className="photos">
            <h4 className="photos__heading">ПРИЛОЖЕННЫЕ ФОТО</h4>
            <div className="photos__list">
              {(organization.photos || []).map((photo:Photo, idx) => <div key={idx} className="photos__item">
                <img onClick={handleDelImg(photo.name)} src="/images/icons/Delete-img.svg" alt="del" className="photos__imgBtn" />
                <a href={photo.filepath} target="_blank" className="photos__link">
                  <img src={photo.thumbpath} alt="photo" className="photos__img" />
                </a>
                <p className="photos__name">{photo.name}</p>
                <p className="photos__date">11 июня 2018</p>
              </div>)}
            </div>
            <button className="commonBtn photos__btn" ><span className="span">&#43;</span>ДОБАВИТЬ ИЗОБРАЖЕНИЕ</button>
          </div>
          <hr className="divider" />
        </div>
      }

      <Dialog open={openName} onClose={handleNameClose} className="dialog">
        <DialogContent className="dialog__content">
          <form id="dialogNameForm" className="dialog__form" onSubmit={handleEditInfo}>
            <input className="commonField dialog__field" type="text" name="text" placeholder="Название" value={shortName} onChange={changeShortName} />
          </form>
        </DialogContent>
        <DialogActions className="dialog__actions">
          <Button className="dialog__btn" variant="text" onClick={handleNameClose}>ОТМЕНА</Button>
          <Button className="dialog__btn" variant="text" type="submit" form="dialogNameForm">ОК</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openInfo} onClose={handleInfoClose} className="dialog">
        <DialogTitle className="dialog__heading">Общая Информация</DialogTitle>
        <DialogContent className="dialog__content">
          <form id="dialogInfoForm" className="dialog__form" onSubmit={handleEditInfo}>
            <input className="commonField dialog__field" type="text" name="text" placeholder="Полное название" value={name} onChange={changeName} />
            <div className="dialog__contract">
              <input className="commonField" type="text" name="text" placeholder="Договор" value={contractNo} onChange={changeContractNo} />
              <input type="date" name="date" id="" value={contractDate} onChange={changeContractDate} />
            </div>
            <input className="commonField dialog__field" type="text" name="text" placeholder="Форма" value={businessEntity} onChange={changeBusinessEntity} />
            <div className="dialogType">
              <div className="dialogType__field">
                <input type="checkbox" id="agent" name="agent" value="agent" checked={typeAgent} onChange={changeTypeAgent} /><label htmlFor="agent">Агент</label>
              </div>
              <div className="dialogType__field">
                <input type="checkbox" id="contractor" name="contractor" value="contractor" checked={typeContractor} onChange={changeTypeContractor} /><label htmlFor="contractor">Подрядчик</label>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className="dialog__actions">
          <Button className="dialog__btn" variant="text" onClick={handleInfoClose}>ОТМЕНА</Button>
          <Button className="dialog__btn" variant="text" type="submit" form="dialogInfoForm">ОК</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openContact} onClose={handleContactClose} className="dialog">
        <DialogTitle className="dialog__heading">Контактные данные</DialogTitle>
        <DialogContent className="dialog__content">
          <form id="dialogContactForm" className="dialog__form" onSubmit={handleEditContact}>
            <input className="commonField dialog__field" type="text" name="text" placeholder="Фамилия" value={userLastname} onChange={changeContactLastname} />
            <input className="commonField dialog__field" type="text" name="text" placeholder="Имя" value={userFirstname} onChange={changeContactName} />
            <input className="commonField dialog__field" type="text" name="text" placeholder="Отчество" value={userPatronymic} onChange={changeContactPatronymic} />
            <input className="commonField dialog__field" type="tel" name="phone" placeholder="Телефон" value={userTel} onChange={changeContactTel} />
            <input className="commonField dialog__field" type="email" name="email" placeholder="Эл. почта" value={userEmail} onChange={changeContactEmail} />
          </form>
        </DialogContent>
        <DialogActions className="dialog__actions">
          <Button className="dialog__btn" variant="text" onClick={handleContactClose}>ОТМЕНА</Button>
          <Button className="dialog__btn" variant="text" type="submit" form="dialogContactForm">ОК</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Card
