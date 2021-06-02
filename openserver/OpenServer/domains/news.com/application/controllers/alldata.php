<?php

defined('BASEPATH') OR exit ('No direct script access allowed');

class alldata extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model('news_model');
	}

	function index(){
		$query = $this->db->select('date, title, description, text, slug')->
		from('news');
		$other_ret['rows'] = $query->get()->result();
		$data['news'] = $other_ret['rows'];

		$this->load->view('alldata', $data);
	}
}
