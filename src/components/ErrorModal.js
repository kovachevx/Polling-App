import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ErrorModal = props => {
    return (<Modal isOpen={resultModalProps.isOpen}
        toggle={toggleResultsModal}
        modalTransition={{ timeout: 300 }}>
        <ModalHeader className="d-flex flex-row justify-content-between">
            <div className={classes.title}>
                {resultModalProps.title}{resultModalProps.title?.endsWith('?') ? '' : '?'}
            </div>
            <div className={classes.totalVotes}>
                Total Votes: {resultModalProps.totalVotes}
            </div>
        </ModalHeader>
        <ModalBody>
            <div>
                {resultModalProps.totalVotes ? resultModalProps.options.map(option => {
                    return (
                        <div key={option.id} className={classes.voteContainer}>
                            <div>{option.text}</div>
                            <div>
                                <ProgressBar value={((option.votes / resultModalProps.totalVotes) * 100).toFixed(2)}>
                                    {((option.votes / resultModalProps.totalVotes) * 100).toFixed(2)}%
                                </ProgressBar>
                            </div>
                        </div>
                    );
                }) : <div><p>No one has voted yet! Be the first one by clicking on the Vote Button.</p></div>}
            </div>
        </ModalBody>
        <ModalFooter className={classes.modalFooter}>
            <Button className={classes.footerBtn} color='danger' onClick={toggleResultsModal}>Close</Button>
        </ModalFooter>
    </Modal >
    );
};

export default ErrorModal;