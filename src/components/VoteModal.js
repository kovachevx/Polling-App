import classes from './VoteModal.module.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ProgressBar } from "reactstrap";
import useVoteStore from '../store/voteStore';
import { useState } from 'react';

const VoteModal = props => {
    const { voteModalProps, toggleVoteModal, voteHandler, setSelectedOption } = useVoteStore();

    return (
        <Modal isOpen={voteModalProps.isOpen} toggle={toggleVoteModal} modalTransition={{ timeout: 300 }}>
            <ModalHeader>
                {voteModalProps.title}{voteModalProps.title?.endsWith('?') ? '' : '?'}
            </ModalHeader>
            <ModalBody>
                <div>
                    {voteModalProps.options !== undefined && voteModalProps.options.map(option => {
                        return (
                            <div key={option.id} className={classes.voteContainer}>
                                <input className={classes.voteInput} name="role" value={option.text} id={option.id} type='radio' onChange={e => setSelectedOption(e.target.value)} />
                                <label htmlFor={option.id}>{option.text}</label>
                            </div>
                        );
                    })}
                </div>
            </ModalBody>
            <ModalFooter className={classes.modalFooter}>
                <Button className={classes.footerBtn} color='primary' onClick={(e) => voteHandler(e, voteModalProps)}>Vote</Button>
                <Button className={classes.footerBtn} color='danger' onClick={toggleVoteModal}>Close</Button>
            </ModalFooter>
        </Modal >
    );

};

export default VoteModal;