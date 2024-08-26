'use client';
import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import { Link, Grid, Column } from '@carbon/react';

const octokitClient = new Octokit({});
function RepoPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function getCarbonRepos() {
      const res = await octokitClient.request('GET /orgs/{org}/repos', {
        org: 'carbon-design-system',
        per_page: 75,
        sort: 'updated',
        direction: 'desc',
      });

      if (res.status === 200) {
        setRows(getRowItems(res.data));
      } else {
        setError('Error obtaining repository data');
      }
      setLoading(false);
    }

    getCarbonRepos();
  }, []);
}

export default RepoPage;
