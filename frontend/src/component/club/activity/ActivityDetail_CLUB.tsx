import React from 'react';
import { Card, Button, Descriptions, Typography, Modal } from 'antd';
import { Remaining, ActivityProps } from './Mock';
import { Link } from 'react-router-dom';
import { getRandomCode } from '../../../apis/ActivityApi';

const gridStyle: React.CSSProperties = {
	width: '50%',
	textAlign: 'center',
};

const MockActivity: ActivityProps = Remaining[0];

interface StatusActionProps {
	status: string;
	id: number;
}

const StatusAction = (props: StatusActionProps) => {
	const { status, id } = props;
	return (
		<React.Fragment>
			<Typography.Text>{`审核状态: ${status}`}</Typography.Text>
			{status === '已计分' && (
				<Button>
					<Link to={`/activity/marks/history/${id}`}>查看</Link>
				</Button>
			)}
			{status === '未计分' && (
				<Button>
					<Link to={`/activity/marks/${id}`}>登记分数</Link>
				</Button>
			)}
		</React.Fragment>
	);
};

const ActivityDeatil_CLUB = () => {
	const [sign, setSign] = React.useState<boolean>(false);
	const [randCode, setRandCode] = React.useState<string>('');

	return (
		<React.Fragment>
			<Card
				style={{ width: '80%', margin: '0 10%' }}
				actions={[
					<StatusAction status={MockActivity.status} id={MockActivity.id} />,
					<Button
						disabled={MockActivity.status !== '未计分'}
						onClick={() => {
							getRandomCode('1').then((res) => {
								setRandCode(res.data);
								setSign(true);
							});
						}}
					>
						{'一键生成签到码'}
					</Button>,
				]}
			>
				<Card.Grid hoverable={false} style={gridStyle}>
					<Card
						hoverable={false}
						cover={<img alt='example' src={MockActivity.img} />}
					></Card>
				</Card.Grid>
				<Card.Grid hoverable={false} style={gridStyle}>
					<Descriptions
						column={1}
						title={'活动信息'}
						style={{ textAlign: 'left' }}
					>
						<Descriptions.Item label='活动编号'>
							{MockActivity.id}
						</Descriptions.Item>
						<Descriptions.Item label='活动时间'>
							{MockActivity.time}
						</Descriptions.Item>
						<Descriptions.Item label='活动地点'>
							{MockActivity.location}
						</Descriptions.Item>
						<Descriptions.Item label='活动类型'>
							{MockActivity.type}
						</Descriptions.Item>
						<Descriptions.Item label='活动描述'>
							{MockActivity.desc}
						</Descriptions.Item>
					</Descriptions>
					<Modal
						title='签到码'
						visible={sign}
						onOk={() => {
							setSign(false);
						}}
						onCancel={() => {
							setSign(false);
						}}
						okText={'确认'}
						cancelText={'取消'}
					>
						<Typography.Text>{randCode}</Typography.Text>
					</Modal>
				</Card.Grid>
			</Card>
		</React.Fragment>
	);
};

export default ActivityDeatil_CLUB;
