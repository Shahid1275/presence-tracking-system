interface FetchDataOptions {
  method?: string;
  body?: Record<string, any>;
}

export const fetchData = async <T>(
  url: string,
  options: FetchDataOptions = { method: 'GET' }
): Promise<T> => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('No authentication token found');
  }

  // Set headers
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Include Bearer token
  };

  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers,
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text(); // Get error details from response
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred');
  }
};