import noOrders from 'assets/images/no-order.png';
import axios from 'axios';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaListAlt, FaLuggageCart, FaScrewdriver } from 'react-icons/fa';
import { GiCancer, GiReceiveMoney } from 'react-icons/gi';
import { TbTruckDelivery } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import checkPromotion from 'utils/CheckPromotion';
import numberWithCommas from 'utils/numberWithCommas';
import Review from './components/Review';

export default function MyOrder() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    useEffect(() => {
        scrollToTop();
    }, []);
    const { userInfo } = useSelector((state) => state);
    const [loadingPage, setLoadingPage] = useState(false);
    const [myOrders, setMyOrders] = useState();
    const [confirm, setConfirm] = useState(false);
    const [modalReview, setModalReview] = useState(false);
    const [formReview, setFormReview] = useState(false);
    const [confirmId, setConfirmId] = useState(false);
    // actions for comments    
    const fetchUserOrder = (id) => {
        setLoadingPage(true);
        axios.get(`/api/orders/user/${id}`)
        .then(res => {
            if (res.data.success) {
                setMyOrders(res.data.data);
            }
            setLoadingPage(false);
        })
    }
    useEffect(() => {
        fetchUserOrder(userInfo._id);
    }, [userInfo._id]);

    const [currentTab, setCurrentTab] = useState('all');
    const countStatus = (status) => {
        return myOrders?.filter(bill => bill.status === status).length;
    }

    const newOrders = [].concat(myOrders ? myOrders : [])
        .sort((a, b) => a.itemM > b.itemM ? 1 : -1)
        .filter(order => currentTab === "all" ?
            true : order.status === currentTab);

    const handleCancelOrder = (id) => {
        axios.post(`api/orders/status`, { id, status: 5})
        .then(res => {
          if (res.data.success) {
            const index = newOrders.findIndex(prev => prev._id === id);
            newOrders[index].status = 5;
            setConfirm(false)
            toast.success('B???n ???? h???y th??nh c??ng.')
          }
        }).catch((e)=>{
          toast.error('Kh??ng th??? k???t n???i m??y ch???')
        })
    }

  const handleSelectItemCancel = (id) => {
    setConfirm(true)
    setConfirmId(id)
  }

  const handleItemReview = (id, type, productId) => {
    setFormReview({user: userInfo._id, id, type, productId})
    setModalReview(true)
  }

return (
    <>
        <Modal show={modalReview} setShow={setModalReview} title="????nh gi?? s???n ph???m">
            <Review setModal={setModalReview} formReview={formReview} reload={fetchUserOrder}/>
        </Modal>
        <Modal show={confirm} setShow={setConfirm} title="X??c nh???n h???y ????n h??ng">
            <div className="mt-2">
            <p className="text-sm text-gray-500">
                B???n c?? ch???c ch???n mu???n h???y ?????t l???ch b???o d?????ng?
            </p>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={()=> handleCancelOrder(confirmId)}
            >
                X??c nh???n
            </button>
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={()=> setConfirm(false)}
            >
                B??? qua
            </button>
            </div>
        </Modal>
            {loadingPage ?
                <div className="product-loading">
                    <Loading />
                </div> :
                <div className="my-order">
                    <div className="container">
                        <div className="my-order-title">
                            <h1><FaLuggageCart /> L???ch s??? mua h??ng</h1>
                        </div>
                        <div className="my-order-menu">
                            <div className={`my-order-menu-item ${currentTab === 'all' ? 'active' : ''}`}  onClick={() => setCurrentTab('all')}>
                                <FaListAlt className="text-red-500 mr-2" />
                                T???t c???
                                {myOrders?.length ?
                                    <span className="count-item">{myOrders.length}</span>
                                    : ''}
                            </div>
                            <div className={`my-order-menu-item ${currentTab === 0 ? 'active' : ''}`}  onClick={() => setCurrentTab(0)}>
                                <FaScrewdriver className="text-red-500 mr-2" />
                                ??ang x??? l??
                                {
                                countStatus(0) ?
                                    <span className="count-item">
                                        {countStatus(0)}
                                    </span> : ''
                                }
                            </div>
                            <div className={`my-order-menu-item ${currentTab === 2 ? 'active' : ''}`}  onClick={() => setCurrentTab(2)}>
                                <TbTruckDelivery className="text-red-500 mr-2" />
                                ??ang v???n chuy???n
                                {
                                countStatus(2) ?
                                    <span className="count-item">
                                        {countStatus(2)}
                                    </span> : ''
                                }
                            </div>
                            <div className={`my-order-menu-item ${currentTab === 1 ? 'active' : ''}`}  onClick={() => setCurrentTab(1)}>
                                <GiReceiveMoney className="text-red-500 mr-2" />
                                ???? nh???n
                                {
                                countStatus(1) ?
                                    <span className="count-item">
                                        {countStatus(1)}
                                    </span> : ''
                                }
                            </div>
                            <div className={`my-order-menu-item ${currentTab === 3 ? 'active' : ''}`}  onClick={() => setCurrentTab(3)}>
                                <GiCancer className="text-red-500 mr-2" />
                                ???? h???y
                                {
                                countStatus(3) ?
                                    <span className="count-item">
                                        {countStatus(3)}
                                    </span> : ''
                                }
                            </div>
                        </div>
                <div className="my-order-content">
                    <div className="my-order-list">
                        <div>
                            {
                                newOrders?.length > 0 ? newOrders?.map((order, index) => (
                                    <div key={index} className="my-order-list-item">
                                        <div className="item-tag"
                                            style={{
                                                color:
                                                    order.status === 1 ? "green" :
                                                        order.status === 3 ? "#d40a25" :
                                                            "#ffc318"
                                            }}
                                        >
                                            <i className="fas fa-tag"></i>
                                        </div>
                                        <div className="item-top">
                                            <div className="item-top-left">
                                                <h2 className="text-lg"><b>M?? ????n h??ng: </b> <i>{order._id}</i></h2>
                                                <p>
                                                    <AiOutlineClockCircle />
                                                    <i> Ng??y ?????t h??ng: {moment(order.createdAt).format("DD/MM/YYYY hh:mm")}</i>
                                                </p>
                                            </div>
                                            <div className="item-top-status_right">
                                                <div className={`btn btn-${
                                                    order.status === 0 ? 'pending' :
                                                    (order.status === 3 || order.status === 5)? 'transport' :
                                                    order.status === 2 ? 'transport' :
                                                    order.status === 1 ? 'received' : 'cancel'
                                                }`}>{
                                                    order.status === 0 ? '??ang x??? l??' :
                                                    order.status === 2 ? '???? ti???p nh???n' :
                                                    order.status === 3 ? '??ang v???n chuy???n' :
                                                    order.status === 5 ? '???? g???i y??u c???u h???y' :
                                                    order.status === 4 ? 'Ch??? nh???n' :
                                                    order.status === 1 ? '???? nh???n' : '???? h???y'
                                                }</div>
                                                <div className={`btn btn-${
                                                    order.payment === 0 ? 'pending' :
                                                    order.payment === 3 ? 'transport' :
                                                    order.payment === 1 ? 'received' : 'cancel'
                                                }`}>{
                                                    order.payment === 0 ? '??ang x??? l??' :
                                                    order.payment === 3 ? '???? ho??n tr???' :
                                                    order.payment === 1 ? '???? thanh to??n' : 'Kh??ng th??nh c??ng'
                                                }</div>
                                            </div>
                                        </div>
                                        
                                        { order.orderMoTo && order.orderMoTo.length > 0 && 
                                            <fieldset>
                                            <legend>Mo To:</legend>
                                            {
                                            order.orderMoTo.map((item, index) => (
                                                <div key={index} className="item-content-items">
                                                    <div className="item-content">
                                                        <Link  to={`/product/${item.productId}`} className="flex items-center w-1/2">
                                                            <img src={item.image} alt="" />
                                                            <div className="item-content-info">
                                                                <p>{item.name}</p>
                                                                <i>S??? l?????ng: x{item.quantity}</i>
                                                            </div>
                                                        </Link>
                                                        <div className="">
                                                            Gi?? xe
                                                        { checkPromotion(item) ? 
                                                            <div className="">
                                                                <span className="line-through text-xs text-gray-500">{numberWithCommas(item.quantity * item.listedPrice)}???</span>
                                                                <p className="font-bold">{numberWithCommas((item.quantity * item.listedPrice) - (item.promotion_id?.rate / 100 * item.listedPrice))}???</p>
                                                            </div>
                                                            : <p>{numberWithCommas(item.listedPrice)}???</p>
                                                        }
                                                        </div>
                                                        <div className="item-content-price">
                                                            <p><b>{numberWithCommas(item.price)}???</b></p>
                                                            {order.status === 1 && (
                                                                item.rating === 1 ?
                                                                    <span className="btn btn-info">???? ????nh gi??</span> :
                                                                    <span
                                                                        className="btn btn-pending"
                                                                        onClick={()=> handleItemReview(item._id, 'moto', item.productId)}>
                                                                        ????nh gi??
                                                                    </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                ))
                                            }
                                             <div className='text-right'>  
                                                {order.orderMoTo.status === 0 && <div className="btn btn-pending">??ang x??? l??</div>}
                                                {order.orderMoTo.status === 2 && <div className="btn btn-transport">???? ti???p nh???n</div>}
                                                {order.orderMoTo.status === 3 && <div className="btn btn-transport">??ang v???n chuy???n</div>}
                                                {order.orderMoTo.status === 5 && <div className="btn btn-transport">???? g???i y??u c???u h???y</div>}
                                                {order.orderMoTo.status === 1 && <div className="btn btn-received">???? nh???n</div>}
                                                {order.orderMoTo.status === -1 && <div className="btn btn-cancel">???? h???y</div>}
                                            </div>
                                        </fieldset>
                                        }
                                        { order.orderAccessory && 
                                        <fieldset>
                                            <legend>Ph??? T??ng:</legend>
                                            {
                                              order.orderAccessory.map((item, index) => (
                                                <div key={index} className="item-content-items">
                                                    <div className="item-content">
                                                    <Link to={`/accessory/${item.productId}`} className=" flex items-center">
                                                        <img src={item.image} alt="" className="w-[100px]" />
                                                        <div className="item-content-info">
                                                            <p>{item.name}</p>
                                                            <i>S??? l?????ng: x{item.quantity}</i>
                                                        </div>
                                                    </Link>
                                                    <div className="item-content-price">
                                                        { checkPromotion(item) ? 
                                                            <div className="">
                                                                <span className="line-through text-xs text-gray-500">{numberWithCommas(item.quantity * item.price)}???</span>
                                                                <p className="font-bold">{numberWithCommas((item.quantity * item.price) - (item.promotion_id?.rate / 100 * item.price))}???</p>
                                                            </div>
                                                            : <p>{numberWithCommas(item.quantity * item.price)}???</p>
                                                        }
                                                        {order.status === 1 && (
                                                            item.rating === 1 ?
                                                                <span className="btn btn-info">???? ????nh gi??</span> :
                                                                <span
                                                                    className="btn btn-pending"
                                                                    onClick={()=> handleItemReview(item._id, 'accessory', item.productId)}>
                                                                    ????nh gi??
                                                                </span>
                                                        )}
                                                    </div>
                                                    </div>
                                                </div>
                                                ))
                                            }
                                            <div className='text-right'>  
                                                {order.orderMoTo.status === 0 && <div className="btn btn-pending">??ang x??? l??</div>}
                                                {order.orderMoTo.status === 2 && <div className="btn btn-transport">???? ti???p nh???n</div>}
                                                {order.orderMoTo.status === 3 && <div className="btn btn-transport">??ang v???n chuy???n</div>}
                                                {order.orderMoTo.status === 1 && <div className="btn btn-received">???? nh???n</div>}
                                                {order.orderMoTo.status === -1 && <div className="btn btn-cancel">???? h???y</div>}
                                            </div>
                                        </fieldset>
                                        }
                                        <div className="flex justify-end w-full ">
                                            <div className="w-96">
                                                <div className="flex justify-between text-sm px-4 text-yellow-500">
                                                    Ph?? ship: <b>{numberWithCommas(order.fee ? order.fee : 0 )} ???</b>
                                                </div>
                                                <div className="flex justify-between font-bold text-rose-400 px-4">
                                                    Gi???m gi??: <b>{numberWithCommas(order.discount ? order.discount : 0)}???</b>
                                                </div>
                                                <div className="flex justify-between text-lg px-4 text-sky-500">
                                                    Gi?? tr??? th???c t???: <b>{numberWithCommas(order.totalEstimate ? order.totalEstimate : 0 )} ???</b>
                                                </div>
                                                <div className="flex justify-between item-total">
                                                    Gi?? tr??? ????n h??ng: <b>{numberWithCommas(order.totalPrice)} ???</b>
                                                </div>
                                            </div>
                                        </div>
                                        { order.status === 0 && 
                                            <div
                                                className="w-full text-right"
                                            >
                                                <button className="btn-cancel btn" onClick={() => handleSelectItemCancel(order._id)}>
                                                    H???y ????n h??ng
                                                </button>
                                            </div>}

                                    </div>
                            )) : <div className="item-order-empty">
                                <img src={noOrders} alt="" />
                                <p>NO ORDER HERE!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
                    </div>
                </div>
            }
        </>
    )
}
