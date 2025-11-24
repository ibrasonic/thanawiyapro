import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

function LoadingSpinner({ fullScreen = false, size = 'lg', message = 'جاري التحميل...' }) {
  const content = (
    <div className="text-center">
      <Spinner
        animation="border"
        variant="primary"
        size={size}
        role="status"
        aria-label={message}
      />
      {message && <p className="mt-3 text-muted">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        {content}
      </div>
    );
  }

  return content;
}

LoadingSpinner.propTypes = {
  fullScreen: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg']),
  message: PropTypes.string
};

export default LoadingSpinner;
