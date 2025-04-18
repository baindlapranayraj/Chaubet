#[macro_export]
macro_rules! check_zero {
    ($arr:expr) => {
        if $arr.iter().any(|amount| *amount == Decimal::ZERO) {
            return err!(ChauError::ZeroAmount);
        }
    };
}

#[macro_export]
macro_rules! add_or_sub {
    ($value_one:expr, $value_two:expr, $is_add:expr) => {
        if $is_add {
            match $value_one.checked_add($value_two) {
                Some(val) => Ok(val),
                None => err!(ChauError::ArthemeticOverflow),
            }
        } else {
            match $value_one.checked_sub($value_two) {
                Some(val) => Ok(val),
                None => err!(ChauError::ArthemeticUnderflow),
            }
        }
    };
}

#[macro_export]
macro_rules! div {
    ($value_one:expr,$value_two:expr) => {
        match $value_one.checked_div($value_two) {
            Some(val) => val,
            None => return Err(ChauError::ArthemeticError.into()),
        }
    };
}

#[macro_export]
macro_rules! mul {
    ($value_one:expr,$value_two:expr) => {
        match $value_one.checked_mul($value_two) {
            Some(val) => val,
            None => return err!(ChauError::ArthemeticOverflow),
        }
    };
}

#[macro_export]
macro_rules! decimal_convo {
    ($value:expr) => {
        Decimal::from($value)
    };
}

#[macro_export]
macro_rules! check_ban {
    ($ban:expr) => {
        if $ban {
            return err!(ChauError::Banned);
        }
    };
}

#[macro_export]
macro_rules! admin_check {
    ($self:expr) => {
        let admin_check = $self
            .chau_config
            .admin
            .iter()
            .any(|admin_pubkey| $self.admin.key() == *admin_pubkey);

        if !admin_check {
            return err!(ChauError::UnAuthourized);
        }
    };
}
